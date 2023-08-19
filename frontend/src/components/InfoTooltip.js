import React from "react";
import sucess from "../images/sucess.png";
import loss from "../images/loss.png";

function InfoTooltip({ isOpen, onClose, parametrInfo }) {
  const windowClass = `window  ${isOpen ? "window_opened" : ""}`;

  return (
    <div className={windowClass}>
      <div className="window__container">
        <img
          className="window__sign"
          src={parametrInfo.image ? sucess : loss}
        />
        <p className="window__subtitle">{parametrInfo.subtitle}</p>
        <button
          className={"window__close"}
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
