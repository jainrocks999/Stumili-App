import { Colors, Fonts, FontSize } from '@constants';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import First from './svg/first.svg';
import Second from './svg/second.svg';
import third from './svg/third.svg';
import Carbs from './svg/Carbs.svg'
import Fates from './svg/fatsIcon.svg'
const data1 = [
  {
    title: 'Grilled Chicken',
    nut: '35g protein',
    cal: '165 kcal',
    icon: First,
    buttonc: '#3B82F6',
  },
  {
    title: 'Avocado',
    nut: '15g fats',
    cal: '135 kcal',
    icon: third,
    buttonc: '#EF4444',
  },
  {
    title: 'Brown Rice',
    nut: '45g carbs',
    cal: '180 kcal',
    icon: Second,
    buttonc: '#F59E0B',
  },
];

const Contribution = ({data}:{data:any}) => {
  if(!data){
    return null
  }
  const icons = {
    calories: First,
    protein: Second,
    carbs: Carbs,
    fats: Fates,
  } as any;
 const colors = {
  calories: "#FF6B3D", // Bright orange flame (Calories)
  protein:  "#3B82F6", // Bright blue (Protein)
  carbs:    "#FACC15", // Bright yellow (Carbs)
  fats:     "#10B981"  // Bright green (Healthy fats)
} as any;
  const getNutValue = (type:string, data:any) => {
  
  switch (type) {
    case "calories":
      return `${data?.totalCalories} kcal`;
    case "protein":
      return `${data.totalProtein} g`;
    case "carbs":
      return `${data.totalCarbs} g`;
    case "fats":
      return `${data.totalFats} g`;
  }
};
 const listData = Object.keys(data||{}).map(key => ({
  title: key.charAt(0).toUpperCase() + key.slice(1),
  foodName: data[key]?._id, // 👈 FOOD NAME HERE
  nut: getNutValue(key, data[key]),
  cal: `${data[key].count} times`,
  icon: icons[key],
  buttonc: colors[key]
}));
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.title}>Top Contributors</Text>
      <FlatList
        data={listData}
        scrollEnabled={false}
        contentContainerStyle={{ marginTop: 10 }}
        renderItem={({ item, index }) => {
          const Icon = item.icon;
          return (
            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: '#F9FAFB',
                marginTop: 10,
                paddingVertical: 15,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    backgroundColor: item.buttonc,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon height={36} width={36} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text
                    style={{
                      fontSize: FontSize.SIXTEEN,
                      fontWeight: '500',
                      color: Colors.BLACK,
                    }}
                  >
                    {item.foodName}
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSize.FOURTEEN,
                      fontWeight: '400',
                      color: '#6B7280',
                    }}
                  >
                    {item.nut}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: FontSize.FOURTEEN,
                  color: '#4B5563',
                  fontWeight: '400',
                }}
              >
                {item.cal}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default Contribution;
const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.EIGHTEEN,
    color: Colors.BLACK,
    fontWeight: '600',
  },
});
