import api from '@/api/apiClient';
import { create, open, dismissLink, LinkSuccess, LinkExit, LinkIOSPresentationStyle, LinkLogLevel, PlaidEnvironment } from 'react-native-plaid-link-sdk';

export const createTokenPlaidLink = async () => {
    try {
      const response = await api.post('/plaid/create_link_token', { id: 'user_id' });
      const link_token = response.data;
      const linkTokenConfiguration = {
        token: link_token,
      };
      create(linkTokenConfiguration);
      console.log(link_token);
  
    } catch (error) {
      console.error('Error creating link token', error);
    }
  };


    // Plaid Link
  

export const createLinkOpenProps = () => {
    return {
        onSuccess: async (success: LinkSuccess) => {
        console.log('Success: ', success);
        await api.post('/plaid/store-metadata', { id: 'user_id', success },);
        await api.post('/plaid/exchange_public_token', {
            public_token: success.publicToken,
            id: 'user_id',
            linkSessionId: success.metadata.linkSessionId,
        });
        },
        onExit: (linkExit: LinkExit) => {
        console.log('Exit: ', linkExit);
        dismissLink();
        },
        iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
        logLevel: LinkLogLevel.ERROR,
    };
    };
    