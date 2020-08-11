import React from 'react';
import {VerifiedSvg} from '../../svg';
import {GenericView, Success} from '../../components';
import {NAVIGATION_TO_DASHBOARD_SCREEN} from '../../navigation/routes';

// TODO: authorized user and send him/her to dashboard
export default function PhoneVerified({navigation}) {
  // const dispatch = useDispatch();

  const loginHandler = async () => {
    navigation.navigate(NAVIGATION_TO_DASHBOARD_SCREEN);
  };

  return (
    <GenericView>
      <Success
        onPress={loginHandler}
        icon={<VerifiedSvg />}
        title={'Verified'}
        caption={
          'You have successfully verified your Phone \nnumber using the code'
        }
      />
    </GenericView>
  );
}
