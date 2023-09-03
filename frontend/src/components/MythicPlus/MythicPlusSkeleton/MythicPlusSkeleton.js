import "./MythicPlusSkeleton.css";

function MythicPlusSkeleton() {
  return (
    <div className="mythic-plus-skeleton">
      <div className="mythic-plus-skeleton__container">
        <span className="mythic-plus-skeleton__title"></span>
        <span className="mythic-plus-skeleton__body"></span>
        <span className="mythic-plus-skeleton__info-panel"></span>
      </div>
    </div>
  );
}

export default MythicPlusSkeleton;
