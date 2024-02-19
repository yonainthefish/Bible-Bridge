import { createContext, useState } from 'react';

interface ContextType {
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadContext = createContext<ContextType>({
  isUploadModalOpen: false,
  setIsUploadModalOpen: () => {},
});

export default function UploadContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <UploadContext.Provider
      value={{
        isUploadModalOpen,
        setIsUploadModalOpen,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export { UploadContext };
