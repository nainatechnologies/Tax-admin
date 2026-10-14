import React from 'react';
import { Users, Clock, FileText, Folder, CreditCard, CheckCircle2 } from 'lucide-react';

export default function MetricCards({ metrics, onCardClick }) {
  const cards = [
    {
      id: 'total-users',
      label: 'Total Users',
      value: metrics.totalUsers,
      icon: Users,
      type: 'users',
      viewTarget: 'users',
    },
    {
      id: 'pending-ca',
      label: 'Pending CA Assignment',
      value: metrics.pendingCaAssignment,
      icon: Clock,
      type: 'pending',
      viewTarget: 'assign-ca',
    },
    {
      id: 'active-cases',
      label: 'Active Cases',
      value: metrics.activeCases,
      icon: FileText,
      type: 'active',
      viewTarget: 'cases',
    },
    {
      id: 'documents-review',
      label: 'Documents Under Review',
      value: metrics.documentsUnderReview,
      icon: Folder,
      type: 'docs',
      viewTarget: 'documents',
    },
    {
      id: 'payment-pending',
      label: 'Payment Pending',
      value: metrics.paymentPending,
      icon: CreditCard,
      type: 'payment',
      viewTarget: 'payments',
    },
    {
      id: 'completed-cases',
      label: 'Completed Cases',
      value: metrics.completedCases,
      icon: CheckCircle2,
      type: 'completed',
      viewTarget: 'cases',
    },
  ];

  return (
    <div className="metrics-row">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="metric-card"
            onClick={() => onCardClick && onCardClick(card.viewTarget)}
            style={{ cursor: onCardClick ? 'pointer' : 'default' }}
            title={`View ${card.label}`}
          >
            <div className={`metric-icon-wrap ${card.type}`}>
              <IconComponent size={20} />
            </div>
            <div className="metric-data">
              <span className="metric-number">{card.value}</span>
              <span className="metric-label">{card.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
