// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      text: string;
      button: string;
      default: string;
      secondary: string;
      error: string;
      modal: string;
      bottomSheet: string;
      backgroundScroll: string;
    };
  }
}

export interface ButtonSubmitProps {
  width?: string;
}

export interface ViewTextInput {
  color?: string;
  verticalMargin?: number;
  width?: string;
}

export interface InterfaceText {
  color?: string;
  fontSize?: number;
  marginVertical?: number;
  maxWidth?: boolean;
}

export interface BackgroundInterface {
  color?: string;
}

export interface ButtonModalProps {
  color?: string;
}

export interface TextButtonProps {
  color?: string;
}

export interface ButtonBottomSheetProps {
  color?: string;
}
