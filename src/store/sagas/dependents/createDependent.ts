import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeLatest, put, select } from '@redux-saga/core/effects';
import { MaskService } from 'react-native-masked-text';
import { Action } from 'redux';
import { Dependents } from '../../../types/datas';
import { getState } from '../../../utils';
import { Creators, Types } from '../../reducers/Dependents';
import { Creators as modalActions } from '../../reducers/modalReducer';

interface ActionCreateDependent extends Action {
  data: Dependents;
}

function* createDependent(props: ActionCreateDependent) {
  try {
    const { cpf } = props.data;

    const rawCPF = MaskService.toRawValue('cpf', cpf);

    const {
      dependentsReducer: { data },
      authReducer: { user },
    } = yield select(getState);

    const newData = [
      {
        ...props.data,
        cpf: rawCPF,
        id: Date.now(),
      },
      ...data,
    ];

    yield put(
      modalActions.setModal({
        visible: true,
        title: 'Adicionado',
        message: 'Dependente adicionado com sucesso!',
        type: 'success',
      }),
    );

    yield AsyncStorage.setItem(
      `dependents@${user.id}`,
      JSON.stringify(newData),
    );

    yield put(Creators.listDependentsSuccess(newData));
  } catch (error) {
    yield put(
      modalActions.setModal({
        visible: true,
        title: 'ERRO',
        message: 'Falha ao adicionar dependente!',
        type: 'success',
      }),
    );
    yield put(Creators.listDependentsFailed(error));

    yield put(Creators.setErrorDependents());
  }
}

export default function* watch() {
  yield takeLatest(Types.CREATE_DEPENDENT, createDependent);
}
