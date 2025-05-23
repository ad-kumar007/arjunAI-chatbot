import React, { useEffect, useRef } from 'react';

const Typewriter = () => {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const text = 'Chat AI Tech..';
    let index = 0;
    let isDeleting = false;

    const type = () => {
      const el = typewriterRef.current;
      if (!el) return;

      if (!isDeleting) {
        el.textContent = text.substring(0, index + 1);
        index++;

        if (index === text.length) {
          // Pause before deleting
          setTimeout(() => {
            isDeleting = true;
            type();
          }, 1000);
          return;
        }
      } else {
        el.textContent = text.substring(0, index - 1);
        index--;

        if (index === 0) {
          // Pause before typing again
          isDeleting = false;
          setTimeout(type, 500);
          return;
        }
      }

      const speed = isDeleting ? 80 : 150;
      setTimeout(type, speed);
    };

    type();
  }, []);

  return <div ref={typewriterRef} className="typewriter-text"></div>;
};

export default Typewriter;
