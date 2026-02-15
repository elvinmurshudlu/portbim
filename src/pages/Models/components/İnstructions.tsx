import {useState} from "react";

export function Instructions() {
    const [isOpen, setIsOpen] = useState(true)

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed left-6 top-6 z-50 rounded-lg border border-gray-700/50 bg-gray-900/90 p-3 backdrop-blur-sm transition-colors hover:bg-gray-800/90"
            >
                <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        )
    }

    return (
        <div className="fixed left-6 top-6 z-50 w-80 rounded-lg border border-gray-700/50 bg-gray-900/95 p-5 shadow-2xl backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">How to Use</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 transition-colors hover:text-white"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="space-y-4">
                {/* Add Object */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-800">
                            <span className="text-xs text-gray-300">+</span>
                        </div>
                        <h4 className="text-xs font-medium text-gray-200">Add Object</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">
                        Double-click anywhere on the canvas to add a new object
                    </p>
                </div>

                {/* Move Object */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-800">
                            <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </div>
                        <h4 className="text-xs font-medium text-gray-200">Move Object</h4>
                    </div>
                    <div className="space-y-2 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                            <kbd className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-[10px] text-gray-300">↑ ↓ ← →</kbd>
                            <span>Move on X/Z axis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <kbd className="rounded bg-gray-800 px-2 py-0.5 font-mono text-[10px] text-gray-300">Space</kbd>
                            <span>Move up (Y axis)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <kbd className="rounded bg-gray-800 px-2 py-0.5 font-mono text-[10px] text-gray-300">Shift</kbd>
                            <span>Move down (Y axis)</span>
                        </div>
                    </div>
                </div>

                {/* Save Changes */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-800">
                            <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-xs font-medium text-gray-200">Save Changes</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">
                        Click the "Save Changes" button in the bottom-right corner to persist your modifications
                    </p>
                </div>
            </div>
        </div>
    )
}