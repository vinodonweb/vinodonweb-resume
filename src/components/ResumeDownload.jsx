import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Eye, Printer, CloudDownload } from 'lucide-react';

const ResumeDownload = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [downloadCount, setDownloadCount] = useState(247);

  const handleDownload = () => {
    // In a real implementation, this would trigger an actual PDF download
    setDownloadCount(prev => prev + 1);
    
    const link = document.createElement('a');
    link.href = '/resume.pdf'; 
    link.download = '/resume.pdf';
    link.click();
  };

  const handlePreview = () => {
    // Open resume in new tab for preview
    window.open('/resume.pdf', '_blank'); 
  };

  return (
    <div className="terminal p-6 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <FileText className="w-6 h-6 text-[#f5c842]" />
          <span className="code-font text-[#f5c842]">resume.pdf</span>
        </div>

        <motion.div
          className="relative bg-[#0a0a0a] rounded-lg p-6 border border-[#f5c842]/30"
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Preview thumbnail */}
          <div className="bg-white rounded mb-4 h-32 flex items-center justify-center relative overflow-hidden">
            <div className="text-black text-xs space-y-1 w-full p-2">
              <div className="h-2 bg-gray-800 rounded w-3/4"></div>
              <div className="h-1 bg-gray-600 rounded w-full"></div>
              <div className="h-1 bg-gray-600 rounded w-2/3"></div>
              <div className="h-1 bg-gray-600 rounded w-4/5"></div>
              <div className="h-2 bg-[#f5c842] rounded w-1/2 mt-2"></div>
              <div className="h-1 bg-gray-600 rounded w-full"></div>
              <div className="h-1 bg-gray-600 rounded w-3/4"></div>
            </div>
            
            {isHovering && (
              <motion.div
                className="absolute inset-0 bg-black/80 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Eye className="w-8 h-8 text-[#f5c842]" />
              </motion.div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Format:</span>
              <span className="text-[#f5c842] code-font">PDF</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Size:</span>
              <span className="text-[#f5c842] code-font">245 KB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Downloads:</span>
              <span className="text-[#f5c842] code-font">{downloadCount}+</span>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-3">
          <motion.button
            onClick={handlePreview}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-[#f5c842]/20 hover:bg-[#f5c842]/30 rounded border border-[#f5c842]/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            <span className="code-font text-sm">Preview</span>
          </motion.button>
          
          <motion.button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-[#f5c842] hover:bg-[#ffd700] text-black rounded font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4 text-white" />
            <span className="code-font text-sm text-white">Download</span>
          </motion.button>
        </div>

        <p className="text-xs text-gray-500 code-font">
          // Updated {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ResumeDownload;
