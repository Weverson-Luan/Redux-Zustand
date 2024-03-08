import { useState, useEffect } from "react";
import { useWithSound } from "./useWithSound";
import message from "./ifood-2.mp3";
import "./styles.css";

/*
 * Read the blog post here:
 * https://www.letsbuildui.dev/articles/working-with-sound-in-react/
 */
const MessageSound = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { playSound } = useWithSound(message);

  useEffect(() => {
    if (showMessage) {
      playSound();
    }
  }, [showMessage]);

  return (
    <section className="example">
      <div className="container">
        <button
          type="button"
          className="message-trigger"
          onClick={() => setShowMessage(true)}
        >
          Novo pedido
        </button>
        {showMessage && (
          <div className="message">
            <div>
              <div>Aceite novo pedido!</div>
              <a href="#">Visualizar</a>
            </div>
            <button type="button" onClick={() => setShowMessage(false)}>
              X
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export { MessageSound };
