import toast, { ToastBar, Toaster } from 'react-hot-toast';
export const ToastNotify = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            containerClassName="toastMain"
            toastOptions={{
                className: ' ',
                success: {
                    duration: 1500,
                    className: 'commonParent successParent '
                },

                error: {
                    duration: 1500,
                    className: 'commonParent errorParent'
                }
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ message }: any) => (
                        <div className="notify_box">
                            {t.type === 'success' ? (
                                <i onClick={() => toast.dismiss(t.id)} className="CP fa-regular fa-circle-check"></i>
                            ) : (
                                <i onClick={() => toast.dismiss(t.id)} className="CP fa-regular fa-circle-xmark" />
                            )}
                            <span className="message">{message}</span>
                        </div>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
};