import {
  Layout,
  StyledComponentProps,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { Overwrite } from "@ui-kitten/components/devsupport";
import React from "react";
import { Dimensions, StyleSheet, ViewProps } from "react-native";

const TAG = "PANEL";

declare type LayoutStyledProps = Overwrite<
  StyledComponentProps,
  {
    appearance?: "default" | string;
  }
>;
export interface LayoutProps extends ViewProps, LayoutStyledProps {
  children?: React.ReactNode;
  level?: "1" | "2" | "3" | "4" | string;
  totalHeight?: number;
}
export declare type LayoutElement = React.ReactElement<LayoutProps>;

const Panel = ({ children, level, style, totalHeight = -1 }: LayoutProps) => {
  const theme = useTheme();
  const h = Dimensions.get("window").height;

  const customStyles = {
    backgroundColor: theme["color-info-900"],
  };
  if (totalHeight !== -1) {
    customStyles["height"] = h - totalHeight;
  }
  const nstyles = StyleSheet.flatten([customStyles, style && style]);

  return (
    <Layout style={nstyles} level={level}>
      {children}
    </Layout>
  );
};
export default Panel;
