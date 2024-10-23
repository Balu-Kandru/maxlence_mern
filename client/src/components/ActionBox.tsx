import React, { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useActionContext } from '../ActionContext';
import { ApiRoutes } from '../enums/apiRoutes';
import { AxiosResponse } from 'axios';
import { Action, ActionsResponse } from '../types/login.interface';
import { apiClient } from '../helpers/axiosClient';

interface ActionBoxProps {
  actions: Action[];
  onSelectAction: (actionId: number) => void;
}

const ActionBox: React.FC<ActionBoxProps> = ({ actions, onSelectAction }) => {
  const { setActions } = useActionContext();

  useEffect(()=>{
    if(!actions.length){
      apiClient.get(ApiRoutes.USER_ACTIONS)
      .then((actionsData: AxiosResponse<ActionsResponse>) => {
        const actions = actionsData.data.data;
        setActions(actions)
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
