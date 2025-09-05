export class FirebaseUtils {
  public static parseFirebaseRes = (obj: any) => {
    const result = [];
    for (const key in obj) {
      const item = obj[key];
      if (item) {
        item.id = key;
        result.push(item);
      }
    }
    return result;
  };
}
