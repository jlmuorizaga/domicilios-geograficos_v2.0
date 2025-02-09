import { v4 as uuidv4 } from 'uuid';

export class Utils {

  static generaIdUnico() {
    const uuid = uuidv4();
    return uuid;
  }

}
