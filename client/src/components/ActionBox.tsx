import React, { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useActionContext } from '../ActionContext';
import { apiClient, getToken } from '../helpers/common';
import { ApiRoutes } from '../enums/apiRoutes';
import { AxiosResponse } from 'axios';
import { Action, ActionsResponse } from '../types/login.interface';

interface ActionBoxProps {
  actions: Action[];
  onSelectAction: (actionId: number) => void;
}

const ActionBox: React.FC<ActionBoxProps> = ({ actions, onSelectAction }) => {
  const { setActions } = useActionContext();

  useEffect(()=>{
    if(!actions.length){
      const accessToken = getToken();
      apiClient.get(ApiRoutes.USER_ACTIONS, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((actionsData: AxiosResponse<ActionsResponse>) => {
        const actions = actionsData.data.data;
        setActions(actions)
      }).catch((err: any) => {
        console.log(err)
        alert(`Unauthorized user ${err.message}`);
      })
    }
  },[]);

  return (
    <Grid container spacing={2}>
      {actions.map((action, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
          <Button variant="contained" style={{height: 90}} fullWidth onClick={() => onSelectAction(action.id)}>
            {action.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActionBox;
