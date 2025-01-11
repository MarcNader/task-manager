interface OverlayProps {
  isVisible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* <div
        className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2 lg:w-1/3"
        onClick={(e) => e.stopPropagation()} // Prevent click events from bubbling to the overlay
      >
        {children}
      </div> */}
    </div>
  );
};

export default Overlay;
