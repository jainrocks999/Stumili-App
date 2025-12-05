import AsyncStorage from "@react-native-async-storage/async-storage";

export class AppStorage {
  private static instance: AppStorage;

  private constructor() {}

  public static getInstance(): AppStorage {
    if (!AppStorage.instance) {
      AppStorage.instance = new AppStorage();
    }
    return AppStorage.instance;
  }

  // Save string
  async setString(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  // Get string
  async getString(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  // Save object
  async setObject(key: string, value: object): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  // Get object (typed)
  async getObject<T>(key: string): Promise<T | null> {
    const json = await AsyncStorage.getItem(key);
    if (!json) return null;

    try {
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

  // Remove key
  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  // Clear all storage
  async clearAll(): Promise<void> {
    await AsyncStorage.clear();
  }
}

// Export singleton
export const appStorage = AppStorage.getInstance();
