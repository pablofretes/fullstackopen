import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types/diagnose';

const getData = (): Diagnose[] => { return diagnoseData; };

export default { getData };