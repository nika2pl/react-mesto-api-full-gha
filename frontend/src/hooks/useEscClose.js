import React from 'react';

const useEscClose = (isOpen, closeAllPopups) => {

    React.useEffect(() => {
        function closeByEscape(event) {
            if (event.key === 'Escape') {
                closeAllPopups();
            }
        }
        
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);

            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen]);

}

export default useEscClose;