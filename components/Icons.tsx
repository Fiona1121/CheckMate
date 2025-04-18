import Svg, { Defs, G, Mask, Path, Rect, SvgProps } from "react-native-svg";

export const PlusIcon = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <Path
        fill="#000"
        d="M18.75 11.25h-7.5v7.5a1.25 1.25 0 0 1-2.5 0v-7.5h-7.5a1.25 1.25 0 0 1 0-2.5h7.5v-7.5a1.25 1.25 0 0 1 2.5 0v7.5h7.5a1.25 1.25 0 0 1 0 2.5Z"
      />
    </Svg>
  );
};

export const CameraAddIcon = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <Path
        fill="#000"
        d="M6.841.5c-.634 0-1.214.357-1.498.924l-.66 1.31H2.796A2.795 2.795 0 0 0 0 5.53v8.942a2.795 2.795 0 0 0 2.795 2.794H8.49a6.107 6.107 0 0 1-.44-1.118H2.796c-.926 0-1.677-.75-1.677-1.676V5.529c0-.926.75-1.677 1.677-1.677h2.233c.212 0 .405-.119.5-.308l.814-1.618a.559.559 0 0 1 .5-.308h4.207a.56.56 0 0 1 .5.309l.809 1.616a.56.56 0 0 0 .5.31h2.234c.927 0 1.677.75 1.677 1.676v3.467c.4.205.775.453 1.118.737V5.529a2.794 2.794 0 0 0-2.795-2.794h-1.889l-.654-1.308A1.677 1.677 0 0 0 11.05.5H6.841Z"
      />
      <Path
        fill="#000"
        d="M8.938 4.97a4.474 4.474 0 0 1 4.341 3.392 6.122 6.122 0 0 0-1.097.225 3.355 3.355 0 0 0-6.598.854 3.354 3.354 0 0 0 2.5 3.243c-.107.354-.183.72-.225 1.097a4.471 4.471 0 0 1 1.08-8.81Z"
      />
      <Path
        fill="#000"
        d="M19 14.47a5.03 5.03 0 0 1-5.031 5.03 5.03 5.03 0 1 1 5.03-5.03Zm-4.472-2.235a.559.559 0 0 0-1.118 0v1.677h-1.677a.559.559 0 1 0 0 1.117h1.677v1.677a.559.559 0 0 0 1.118 0v-1.677h1.677a.559.559 0 1 0 0-1.117h-1.677v-1.677Z"
      />
    </Svg>
  );
};

export const PhotoIcon = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M16.625 1.857H2.375c-.315 0-.617.143-.84.398-.222.254-.347.6-.347.96v12.214l3.142-3.195a.538.538 0 0 1 .748-.084l3.158 2.406 4.406-5.035a.572.572 0 0 1 .325-.19.529.529 0 0 1 .36.062l4.486 2.643V3.214c0-.36-.126-.705-.348-.96a1.118 1.118 0 0 0-.84-.397ZM2.375.5c-.63 0-1.234.286-1.68.795C.25 1.804 0 2.495 0 3.215v13.57c0 .72.25 1.411.696 1.92.445.509 1.05.795 1.679.795h14.25c.312 0 .62-.07.909-.207.288-.136.55-.336.77-.588.22-.252.396-.551.515-.88.12-.33.181-.683.181-1.04V3.216c0-.72-.25-1.411-.696-1.92C17.86.786 17.254.5 16.625.5H2.375Zm4.75 6.107c0 .267-.046.532-.136.78-.09.246-.22.47-.386.66a1.786 1.786 0 0 1-.578.44 1.59 1.59 0 0 1-.681.156 1.59 1.59 0 0 1-.682-.155 1.786 1.786 0 0 1-.578-.441 2.076 2.076 0 0 1-.386-.66 2.29 2.29 0 0 1-.135-.78c0-.54.187-1.058.521-1.44a1.676 1.676 0 0 1 1.26-.596c.472 0 .925.215 1.26.597.333.381.521.9.521 1.44Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export const PenIcon = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <Path
        fill="#000"
        d="m10.79 3.96 4.75 4.75L5.224 19.028l-4.235.467a.89.89 0 0 1-.983-.983l.47-4.239L10.79 3.96Zm7.688-.707-2.23-2.231a1.782 1.782 0 0 0-2.52 0L11.628 3.12l4.75 4.751 2.1-2.098a1.782 1.782 0 0 0 0-2.52Z"
      />
    </Svg>
  );
};

export const CounterMinusIcon = (props: SvgProps) => {
  return (
    <Svg width={33} height={32} fill="none" {...props}>
      <Path
        fill="#FB8232"
        fillRule="evenodd"
        d="M16.5 31c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15Zm0 1c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16Zm4.8-17c.663 0 1.2.448 1.2 1s-.537 1-1.2 1h-9.6c-.663 0-1.2-.448-1.2-1s.537-1 1.2-1h9.6Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export const CounterPlusIcon = (props: SvgProps) => {
  return (
    <Svg width={33} height={32} fill="none" {...props}>
      <Path
        fill="#FB8232"
        fillRule="evenodd"
        d="M16.5 32c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16Zm0-1c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15Z"
        clipRule="evenodd"
      />
      <Path
        fill="#FB8232"
        d="M16.5 10c-.552 0-1 .537-1 1.2V15h-3.8c-.663 0-1.2.448-1.2 1s.537 1 1.2 1h3.8v3.8c0 .663.448 1.2 1 1.2s1-.537 1-1.2V17h3.8c.663 0 1.2-.448 1.2-1s-.537-1-1.2-1h-3.8v-3.8c0-.663-.448-1.2-1-1.2Z"
      />
    </Svg>
  );
};

export const ArrowLeftIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M15 19.92 8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
      />
    </Svg>
  );
};

export const OutlineAddIcon = (props: SvgProps) => {
  return (
    <Svg width={32} height={31} fill="none" {...props}>
      <Rect
        width={30}
        height={30}
        x={1.411}
        y={0.5}
        stroke="#3F3F3F"
        rx={5.5}
      />
      <Path
        stroke="#3F3F3F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.66 15.5h15.5M16.41 23.25V7.75"
      />
    </Svg>
  );
};

export const OutlineRemoveIcon = (props: SvgProps) => {
  return (
    <Svg width={32} height={32} fill="none" {...props}>
      <Mask
        id="a"
        width={32}
        height={32}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <Path fill="#D9D9D9" d="M.822.5h31v31h-31z" />
      </Mask>
      <G mask="url(#a)">
        <Rect width={31} height={31} x={0.822} y={0.5} fill="#FB8232" rx={6} />
        <G
          stroke="#F8F8F8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          filter="url(#b)"
        >
          <Path d="m10.842 10.52 10.96 10.96M10.842 21.48l10.96-10.96" />
        </G>
      </G>
      <Defs></Defs>
    </Svg>
  );
};
