import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="loader"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 24px;
          height: 24px;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
