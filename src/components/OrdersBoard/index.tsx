import { useState } from 'react';
import { Board, OrderContainer } from './styles';

import { Order } from '../../types/Order';
import { OrderModal } from '../OrdersModal';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setIsModalOpen(state => !state);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalOpen(state => !state);
    setSelectedOrder(null);
  }

  return (
    <Board>
      <OrderModal
        isOpen={isModalOpen}
        order={selectedOrder}
        onRequestClose={handleCloseModal}
      />
      <header>
        <span>{ icon }</span>
        <strong>{ title }</strong>
        <span>({orders.length})</span>
      </header>

      { orders.length > 0 ? (
        <OrderContainer>
          { orders.map(order => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrderContainer>
      ) : null}
    </Board>
  );
}
