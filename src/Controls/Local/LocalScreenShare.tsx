import React, {useContext} from 'react';
import PropsContext, {
  ToggleState,
  UidInterface,
} from '../../Contexts/PropsContext';
import RtcContext from '../../Contexts/RtcContext';
import BtnTemplate from '../BtnTemplate';
import styles from '../../Style';
import {LocalContext} from '../../Contexts/LocalUserContext';
import {DispatchType} from '../../Contexts/RtcContext';
import RtmContext from "agora-rn-uikit/src/Contexts/RtmContext";
interface LocalRaiseHandProps {
  btnText?: string;
  variant?: 'outlined' | 'text';
}

const LocalScreenShare: React.FC<LocalRaiseHandProps> = (props) => {
  const localUser = useContext(LocalContext);
  const {
    btnText = localUser.screenShare === ToggleState.enabled
      ? "Stop Share"
      : "Screen Share",
  } = props;
  const {styleProps} = useContext(PropsContext);
  const {localBtnStyles, remoteBtnStyles} = styleProps || {};
  const {RtcEngine, dispatch} = useContext(RtcContext);
  const {sendChannelMessage, uidMap} = useContext(RtmContext || {});

  return (
    <BtnTemplate
      name={localUser.screenShare === ToggleState.enabled ?  'lowerHand':'raiseHand'}
      btnText={btnText}
      style={{
        ...styles.localBtn,
          alignSelf: 'center'
      }}
      onPress={() => {


        console.log(localUser.screenShare)
        dispatch({
          type: "LocalScreenShare",
          value: [
            localUser.screenShare === ToggleState.disabled
                ? ToggleState.enabled
                : ToggleState.disabled,
          ],
        });

        console.log("CLICK SEE")
        if(localUser.screenShare === ToggleState.enabled){
          RtcEngine.stopScreenCapture()
        }
        else {
          RtcEngine.startScreenCapture({
            captureVideo:true
          })
        }

      }
      }
    />
  );
};



export default LocalScreenShare;
