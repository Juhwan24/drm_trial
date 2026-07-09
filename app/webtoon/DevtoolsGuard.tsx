"use client";

/* eslint-disable no-debugger */

import { useEffect, useRef, useState } from "react";

type DevtoolsGuardProps = {
  children: React.ReactNode;
};

export default function DevtoolsGuard({ children }: DevtoolsGuardProps) {
  const [blocked, setBlocked] = useState(false);
  const [reason, setReason] = useState("");
  const trapStartedRef = useRef(false);

  useEffect(() => {
    let destroyed = false;

    const startBlock = (why: string) => {
      if (destroyed) return;

      setBlocked(true);
      setReason(why);

      if (trapStartedRef.current) return;
      trapStartedRef.current = true;

      // 개발자 도구가 열려 있으면 계속 debugger에 걸리게 하는 방식
      const debuggerTrap = () => {
        if (destroyed) return;

        debugger;

        setTimeout(debuggerTrap, 150);
      };

      setTimeout(debuggerTrap, 150);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      const isF12 = event.key === "F12";

      const isDevtoolsShortcut =
        event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key);

      const isMacDevtoolsShortcut =
        event.metaKey && event.altKey && ["i", "j", "c"].includes(key);

      const isViewSource = (event.ctrlKey || event.metaKey) && key === "u";

      if (
        isF12 ||
        isDevtoolsShortcut ||
        isMacDevtoolsShortcut ||
        isViewSource
      ) {
        event.preventDefault();
        event.stopPropagation();

        startBlock("developer tool shortcut detected");
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const checkDevtoolsBySize = () => {
      const widthGap = Math.abs(window.outerWidth - window.innerWidth);
      const heightGap = Math.abs(window.outerHeight - window.innerHeight);

      if (widthGap > 160 || heightGap > 160) {
        startBlock("developer tool size detected");
      }
    };

    const checkDevtoolsByDebuggerDelay = () => {
      const start = performance.now();

      debugger;

      const end = performance.now();
      const delay = end - start;

      if (delay > 120) {
        startBlock("debugger delay detected");
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("resize", checkDevtoolsBySize);

    const intervalId = window.setInterval(() => {
      checkDevtoolsBySize();
      checkDevtoolsByDebuggerDelay();
    }, 1000);

    return () => {
      destroyed = true;

      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("resize", checkDevtoolsBySize);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div
        style={{
          filter: blocked ? "blur(20px)" : "none",
          pointerEvents: blocked ? "none" : "auto",
          userSelect: "none",
        }}
      >
        {children}
      </div>

      {blocked && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483647,
            background: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: 700 }}>
            보호 모드 활성화
          </h1>

          <p style={{ marginTop: "12px", fontSize: "16px", opacity: 0.8 }}>
            개발자 도구 접근이 감지되어 웹툰 화면을 보호합니다.
          </p>

          <p style={{ marginTop: "16px", fontSize: "13px", opacity: 0.5 }}>
            reason: {reason}
          </p>
        </div>
      )}
    </>
  );
}