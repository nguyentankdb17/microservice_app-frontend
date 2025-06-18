import React from "react";

type ImagePreviewProps = {
    file: File;
    uploadedBytes: number;
    onRemove: () => void;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, uploadedBytes, onRemove }) => {
    const fileSizeKB = (file.size / 1024).toFixed(1);
    const uploadedPercent = Math.min((uploadedBytes / file.size) * 100, 100).toFixed(0);

    const imageUrl = URL.createObjectURL(file);

    return (
        <div className="flex max-w-full flex-col items-center space-y-4 rounded-lg bg-[#1E293B] p-4 text-white">
            <img src={imageUrl} alt={file.name} className="h-48 w-full rounded-lg object-fill" />
            <div className="flex items-center justify-between space-x-10">
                <div>
                    <p className="truncate text-sm font-semibold">{file.name}</p>
                    <p className="text-xs text-gray-400">{fileSizeKB} KB</p>
                </div>
                <div className="text-xs text-blue-400">{uploadedPercent}% uploaded</div>
            </div>

            <div className="h-2 w-full rounded bg-gray-700">
                <div className="h-2 rounded bg-blue-500" style={{ width: `${uploadedPercent}%` }} />
            </div>
            <div>
                <button
                    className="border-stroke text-dark-4 dark:border-dark-3 dark:text-dark-6 flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium duration-200 hover:bg-[#0F172A] hover:text-white"
                    onClick={onRemove}
                >
                    Remove upload
                    <span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2330_10311)">
                                <path
                                    d="M6.5998 5.99999L11.1748 1.42499C11.3436 1.25624 11.3436 0.993738 11.1748 0.824988C11.0061 0.656238 10.7436 0.656238 10.5748 0.824988L5.9998 5.39999L1.4248 0.824988C1.25605 0.656238 0.993555 0.656238 0.824805 0.824988C0.656055 0.993738 0.656055 1.25624 0.824805 1.42499L5.3998 5.99999L0.824805 10.575C0.656055 10.7437 0.656055 11.0062 0.824805 11.175C0.899805 11.25 1.0123 11.3062 1.1248 11.3062C1.2373 11.3062 1.3498 11.2687 1.4248 11.175L5.9998 6.59999L10.5748 11.175C10.6498 11.25 10.7623 11.3062 10.8748 11.3062C10.9873 11.3062 11.0998 11.2687 11.1748 11.175C11.3436 11.0062 11.3436 10.7437 11.1748 10.575L6.5998 5.99999Z"
                                    fill="currentColor"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_2330_10311">
                                    <rect width="12" height="12" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ImagePreview;
