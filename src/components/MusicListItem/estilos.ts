import { StyleSheet } from "react-native";

export const ARROW_WIDTH = 64;

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  slider: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    position: "relative",
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  glossy: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  playOverlay: {
    position: "absolute",
    bottom: 4,
    right: 4,
  },
  infoCol: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
  },
  duration: {
    fontSize: 12,
    marginLeft: 12,
  },
  arrowButton: {
    width: ARROW_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});
