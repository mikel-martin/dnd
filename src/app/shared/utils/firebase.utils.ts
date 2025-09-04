export class FirebaseUtils {

   public static parseFirebaseRes = (obj: any) => {
      let result = [];
      for (let key in obj) {
        let item = obj[key];
        if (item) {
          item.id = key;
          result.push(item);
        }
      }
      return result;
    }

}
