import { KeyboardEvent, useEffect } from 'react';
import { Overlay, ModalBody, OrderDetails, Actions } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';

import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

interface OrderModalProps {
  isOpen: boolean;
  order: Order | null;
  onRequestClose: () => void;
}

export function OrderModal({ isOpen, order, onRequestClose }: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onRequestClose]);



  if (!isOpen || !order) return null;

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type='button' onClick={onRequestClose}>
            <img src={closeIcon} alt='Fechar modal' />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕓' }
              {order.status === 'IN_PRODUTION' && '👨‍🍳' }
              {order.status === 'DONE' && '✅' }
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera' }
              {order.status === 'IN_PRODUTION' && 'Em preparação' }
              {order.status === 'DONE' && 'Pronto' }
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <div
                  className="item-image"
                  style={{ backgroundImage: `url(${`http://localhost:3001/uploads/${product.imagePath}`})` }}
                />
                <div className="quantity">{quantity}x</div>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button type='button' className='primary'>
            <span>👨‍🍳</span>
            <span>Iniciar Produção</span>
          </button>

          <button type='button' className='secondary'>
            <span>Cancelar Pedido</span>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
