import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorDotOutline = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const endX = useRef(0);
  const endY = useRef(0);
  const cursorVisible = useRef(true);
  const cursorEnlarged = useRef(false);

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const toggleCursorVisibility = () => {
    if (cursorDotOutline.current && cursorDot.current) {
      if (cursorVisible.current) {
        cursorDot.current.style.opacity = '1';
        cursorDotOutline.current.style.opacity = '1';
      } else {
        cursorDot.current.style.opacity = '0';
        cursorDotOutline.current.style.opacity = '0';
      }
    }
  };

  const toggleCursorSize = () => {
    if (cursorDotOutline.current) {
      if (cursorEnlarged.current) {
        cursorDotOutline.current.style.transform = `translate3d(${endX.current}px, ${endY.current}px, 0) scale(2)`;
      } else {
        cursorDotOutline.current.style.transform = `translate3d(${endX.current}px, ${endY.current}px, 0) scale(1)`;
      }
    }
  };

  const mouseOverEvent = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };

  const mouseOutEvent = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  const mouseEnterEvent = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  const mouseLeaveEvent = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  const mouseMoveEvent = (e: MouseEvent) => {
    cursorVisible.current = true;
    toggleCursorVisibility();

    endX.current = e.clientX;
    endY.current = e.clientY;

    if (cursorDot.current) {
      cursorDot.current.style.transform = `translate3d(${endX.current}px, ${endY.current}px, 0)`;
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveEvent);
    document.addEventListener('mouseenter', mouseEnterEvent);
    document.addEventListener('mouseleave', mouseLeaveEvent);

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', mouseOverEvent);
      el.addEventListener('mouseleave', mouseOutEvent);
    });

    return () => {
      document.removeEventListener('mousemove', mouseMoveEvent);
      document.removeEventListener('mouseenter', mouseEnterEvent);
      document.removeEventListener('mouseleave', mouseLeaveEvent);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', mouseOverEvent);
        el.removeEventListener('mouseleave', mouseOutEvent);
      });
    };
  }, []);

  useEffect(() => {
    const animateDotOutline = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        if (cursorDotOutline.current) {
          cursorDotOutline.current.style.transform = `translate3d(${endX.current}px, ${endY.current}px, 0) scale(${cursorEnlarged.current ? 2 : 1})`;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateDotOutline);
    };

    requestRef.current = requestAnimationFrame(animateDotOutline);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={cursorDotOutline} className="cursor-dot-outline"></div>
      <div ref={cursorDot} className="cursor-dot"></div>
    </>
  );
};

export default CustomCursor;