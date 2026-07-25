import React, { forwardRef } from 'react';

const ProfileContent = forwardRef(({ children }, ref) => {
    return (
        <div ref={ref} className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-y-auto">
            {children}
        </div>
    );
});

export default ProfileContent;
