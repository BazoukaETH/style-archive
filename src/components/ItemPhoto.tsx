const ItemPhoto = ({ color, name, className = '' }: { color: string; name: string; className?: string }) => (
  <div
    className={`w-full aspect-square rounded-xl flex items-center justify-center ${className}`}
    style={{ backgroundColor: color }}
  >
    <span className="label-caps text-center px-2 opacity-60">{name}</span>
  </div>
);
export default ItemPhoto;
