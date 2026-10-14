import React, { useState, useMemo } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CaManagementView from './components/CaManagementView';
import AddCaModal from './components/AddCaModal';
import ServicesView from './components/ServicesView';
import AddServiceModal from './components/AddServiceModal';
import AssignCaModal from './components/AssignCaModal';
import AssignCaView from './components/AssignCaView';
import CaseDetailsModal from './components/CaseDetailsModal';
import UsersView from './components/UsersView';
import InvoicesView from './components/InvoicesView';
import DocumentsView from './components/DocumentsView';
import NotificationsView from './components/NotificationsView';
import SettingsView from './components/SettingsView';

import {
  initialMetrics,
  initialCases,
  initialCas,
  initialServices,
  initialInvoices,
  initialNotifications,
} from './data/mockData';

export default function App() {
  // Authentication State
  const [adminCredentials, setAdminCredentials] = useState(() => {
    const saved = localStorage.getItem('biztax_admin_creds');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return { username: 'admin@biztax.com', password: 'admin123' };
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleUpdateCredentials = (newCreds) => {
    setAdminCredentials(newCreds);
    localStorage.setItem('biztax_admin_creds', JSON.stringify(newCreds));
  };

  // Navigation State
  const [activeView, setActiveView] = useState('dashboard');
  const [activeNavTab, setActiveNavTab] = useState('home');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // App Data State
  const [cases, setCases] = useState(initialCases);
  const [cas, setCas] = useState(initialCas);
  const [services, setServices] = useState(initialServices);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Modals State
  const [isAddCaModalOpen, setIsAddCaModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [assignModal, setAssignModal] = useState({ isOpen: false, targetCase: null });
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, targetCase: null });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Dynamic Metrics
  const metrics = useMemo(() => {
    const pendingCa = cases.filter(
      (c) => c.status === 'pending-assignment' || !c.assignedCaId || c.assignedCaName === 'Unassigned'
    ).length;
    const underReview = cases.filter((c) => c.status === 'under-review').length;
    const completed = cases.filter((c) => c.status === 'completed').length;
    const active = cases.filter((c) => c.status !== 'completed').length;

    return {
      totalUsers: 7,
      pendingCaAssignment: pendingCa,
      activeCases: active,
      documentsUnderReview: underReview,
      paymentPending: 0,
      completedCases: completed,
    };
  }, [cases]);

  // Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveView('dashboard');
  };

  // Add CA
  const handleAddCa = (newCa) => {
    setCas((prev) => [newCa, ...prev]);
    showToast(`Successfully onboarded ${newCa.name} (${newCa.membershipNo})`);
  };

  // Add Service
  const handleAddService = (newService) => {
    setServices((prev) => [newService, ...prev]);
    showToast(`Service "${newService.name}" published to catalog`);
  };

  // Toggle Service Status
  const handleToggleServiceStatus = (serviceId) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
          : s
      )
    );
  };

  // Assign Case to CA
  const handleAssignCa = (caseId, chosenCa) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            assignedCaId: chosenCa.id,
            assignedCaName: chosenCa.name,
            stage: 'In Progress',
            status: 'in-progress',
          };
        }
        return c;
      })
    );

    // Update CA active cases count
    setCas((prev) =>
      prev.map((ca) => {
        if (ca.id === chosenCa.id) {
          return { ...ca, activeCases: ca.activeCases + 1 };
        }
        return ca;
      })
    );

    showToast(`Assigned ${caseId} to ${chosenCa.name}`);
  };

  // Update Case Stage
  const handleUpdateStage = (caseId, newStage) => {
    let newStatus = 'in-progress';
    if (newStage === 'Completed') newStatus = 'completed';
    else if (newStage === 'Documents Under Review') newStatus = 'under-review';
    else if (newStage === 'Pending CA Assignment') newStatus = 'pending-assignment';
    else if (newStage === 'Verification') newStatus = 'verification';

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return { ...c, stage: newStage, status: newStatus };
        }
        return c;
      })
    );

    showToast(`Case ${caseId} advanced to "${newStage}"`);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  // View Navigation helper
  const handleNavigateView = (viewId) => {
    setActiveView(viewId);
  };

  // If not authenticated, show Login page
  if (!isAuthenticated) {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        adminCredentials={adminCredentials}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Top Navigation Bar: Logo, Global Search Bar & Notifications */}
      <Navbar
        onNavigateView={handleNavigateView}
        notifications={notifications}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        cases={cases}
        cas={cas}
        onOpenCaseDetails={(caseItem) =>
          setDetailsModal({ isOpen: true, targetCase: caseItem })
        }
      />

      <div className="app-body">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onLogout={handleLogout}
          userCount={9}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main View Area */}
        <main className="app-main">
          {activeView === 'dashboard' && (
            <DashboardView
              metrics={metrics}
              cases={cases}
              onNavigateView={handleNavigateView}
              onOpenAssignCa={(caseItem) =>
                setAssignModal({ isOpen: true, targetCase: caseItem })
              }
              onOpenCaseDetails={(caseItem) =>
                setDetailsModal({ isOpen: true, targetCase: caseItem })
              }
              onOpenAddCaModal={() => setIsAddCaModalOpen(true)}
              onOpenAddServiceModal={() => setIsAddServiceModalOpen(true)}
            />
          )}

          {activeView === 'users' && (
            <UsersView
              cases={cases}
              onOpenCaseDetails={(caseItem) =>
                setDetailsModal({ isOpen: true, targetCase: caseItem })
              }
            />
          )}

          {activeView === 'ca-management' && (
            <CaManagementView
              cas={cas}
              onOpenAddCaModal={() => setIsAddCaModalOpen(true)}
              onOpenAssignCaWithCa={(selectedCa) => {
                const unassignedCase = cases.find(
                  (c) => c.status === 'pending-assignment' || !c.assignedCaId
                );
                if (unassignedCase) {
                  setAssignModal({ isOpen: true, targetCase: unassignedCase });
                } else {
                  showToast(`All cases currently assigned. You can reassign from Dashboard.`);
                }
              }}
            />
          )}

          {activeView === 'assign-ca' && (
            <AssignCaView
              cases={cases}
              cas={cas}
              onOpenAssignModal={(caseItem) =>
                setAssignModal({ isOpen: true, targetCase: caseItem })
              }
            />
          )}

          {activeView === 'services' && (
            <ServicesView
              services={services}
              onOpenAddServiceModal={() => setIsAddServiceModalOpen(true)}
              onToggleServiceStatus={handleToggleServiceStatus}
            />
          )}

          {activeView === 'cases' && (
            <DashboardView
              metrics={metrics}
              cases={cases}
              onNavigateView={handleNavigateView}
              onOpenAssignCa={(caseItem) =>
                setAssignModal({ isOpen: true, targetCase: caseItem })
              }
              onOpenCaseDetails={(caseItem) =>
                setDetailsModal({ isOpen: true, targetCase: caseItem })
              }
              onOpenAddCaModal={() => setIsAddCaModalOpen(true)}
              onOpenAddServiceModal={() => setIsAddServiceModalOpen(true)}
            />
          )}

          {activeView === 'documents' && (
            <DocumentsView
              cases={cases}
              onOpenCaseDetails={(caseItem) =>
                setDetailsModal({ isOpen: true, targetCase: caseItem })
              }
            />
          )}

          {activeView === 'payments' && <InvoicesView invoices={invoices} />}

          {activeView === 'invoices' && <InvoicesView invoices={invoices} />}

          {activeView === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkAllRead={handleMarkAllRead}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView
              adminCredentials={adminCredentials}
              onUpdateCredentials={handleUpdateCredentials}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Add CA Modal */}
      <AddCaModal
        isOpen={isAddCaModalOpen}
        onClose={() => setIsAddCaModalOpen(false)}
        onAddCa={handleAddCa}
      />

      {/* Add Service Modal */}
      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onAddService={handleAddService}
      />

      {/* Assign CA Modal */}
      <AssignCaModal
        isOpen={assignModal.isOpen}
        targetCase={assignModal.targetCase}
        cas={cas}
        onClose={() => setAssignModal({ isOpen: false, targetCase: null })}
        onAssign={handleAssignCa}
      />

      {/* Case Details Modal */}
      <CaseDetailsModal
        isOpen={detailsModal.isOpen}
        caseItem={detailsModal.targetCase}
        onClose={() => setDetailsModal({ isOpen: false, targetCase: null })}
        onUpdateStage={handleUpdateStage}
        onOpenAssignCa={(caseItem) =>
          setAssignModal({ isOpen: true, targetCase: caseItem })
        }
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast-message">
            <span>✓</span> {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
