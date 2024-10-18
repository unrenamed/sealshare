"use client";

import * as Toolbar from "@radix-ui/react-toolbar";
import { animated, useSpring } from "@react-spring/web";
import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export enum ThemeValue {
  Dark = "dark",
  Light = "light",
}

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const [styles, api] = useSpring(
    () => ({
      width: 42,
      left: theme === ThemeValue.Light ? "2px" : "unset",
      right: theme === ThemeValue.Light ? "unset" : "2px",
      config: {
        tension: 300,
        clamp: true,
      },
    }),
    []
  );

  const handleValueChange = async (value: ThemeValue) => {
    if (value && value !== theme) {
      setTheme(value);

      api.start({
        to: async (animate) => {
          await animate({ width: 88 });
          api.set({
            left: value === "light" ? "2px" : "unset",
            right: value === "light" ? "unset" : "2px",
          });
          await animate({ width: 42 });
        },
      });
    }
  };

  const handlePointerEnter = (value: ThemeValue) => () => {
    if (theme !== value) {
      api.start({
        width: 52,
      });
    }
  };

  const handlePointerOut = (value: ThemeValue) => () => {
    if (theme !== value) {
      api.start({
        width: 42,
      });
    }
  };

  return (
    <Toolbar.Root>
      <Toolbar.ToggleGroup
        onValueChange={handleValueChange}
        className="dark:bg-neutral-800 bg-gray-100 rounded-md w-[92px] h-[46px] relative"
        value={theme}
        type="single"
      >
        <Toolbar.ToggleItem
          className="relative inline-flex justify-center items-center border-none h-full p-0.5 w-[50%] z-10"
          onPointerEnter={handlePointerEnter(ThemeValue.Light)}
          onPointerOut={handlePointerOut(ThemeValue.Light)}
          value="light"
        >
          <SunIcon
            size={20}
            strokeWidth={1.5}
            style={{ pointerEvents: "none" }}
          />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="relative inline-flex justify-center items-center border-none h-full p-0.5 w-[50%] z-10"
          onPointerEnter={handlePointerEnter(ThemeValue.Dark)}
          onPointerOut={handlePointerOut(ThemeValue.Dark)}
          value="dark"
        >
          <MoonStarIcon
            size={20}
            strokeWidth={1.5}
            style={{ pointerEvents: "none" }}
          />
        </Toolbar.ToggleItem>
        <animated.div
          className="absolute bg-background h-[42px] top-[2px] z-0 rounded-md"
          style={styles}
        />
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};
