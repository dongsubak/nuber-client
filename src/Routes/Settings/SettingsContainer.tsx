import React from "react";
import SettingsPresenter from "./SettingsPresenter";

interface IProps {
}
class SettingsContainer extends React.Component<IProps> {
  public render() {
    return <SettingsPresenter />;
  }
}

export default SettingsContainer;