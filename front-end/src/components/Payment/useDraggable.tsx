import { useRef, useEffect, useState } from 'react';

const useDraggable = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
    const [initialFormPos, setInitialFormPos] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && ref.current) {
                const offsetX = e.clientX - initialMousePos.x;
                const offsetY = e.clientY - initialMousePos.y;

                const newPosition = {
                    x: initialFormPos.x + offsetX,
                    y: initialFormPos.y + offsetY,
                };

                setPosition(newPosition);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, initialMousePos, initialFormPos]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
            e.preventDefault();
        }
        setIsDragging(true);
        setInitialMousePos({ x: e.clientX, y: e.clientY });

        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setInitialFormPos({ x: rect.left, y: rect.top });
        }
    };

    return {
        position,
        isDragging,
        onMouseDown: handleMouseDown,
        ref,
    };
};

export default useDraggable;
