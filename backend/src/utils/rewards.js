

/**
 * Calculate XP earned from a focus session
 * @param {Number} durationMinutes - How long the session was
 * @param {Number} userLevel - User's current level
 * @returns {Number} XP earned
 */
export function calculateXP(durationMinutes, userLevel = 1) {
  const baseXP = 10;
  const timeBonus = durationMinutes * 2;
  const levelBonus = Math.floor(userLevel / 5) * 5; // +5 XP every 5 levels
  
  return baseXP + timeBonus + levelBonus;
}

/**
 * Calculate coins earned from a focus session
 * @param {Number} durationMinutes - How long the session was
 * @param {Number} userLevel - User's current level
 * @returns {Number} Coins earned
 */
export function calculateCoins(durationMinutes, userLevel = 1) {
  const baseCoins = 5;
  const timeBonus = Math.floor(durationMinutes / 10); // +1 coin per 10 min
  const levelBonus = Math.floor(userLevel / 5); // +1 coin every 5 levels
  
  return baseCoins + timeBonus + levelBonus;
}

/**
 * Calculate user level from total XP
 * @param {Number} totalXP - User's total XP
 * @returns {Number} User's level
 */
export function calculateLevel(totalXP) {
  if (totalXP < 0) return 1;
  
  let level = 1;
  let xpNeeded = 0;
  
  // XP needed for each level increases
  // Level 2: 100 XP
  // Level 3: 100 + 150 = 250 XP
  // Level 4: 250 + 200 = 450 XP
  // Formula: Each level needs (level * 50) more XP
  
  while (totalXP >= xpNeeded) {
    level++;
    xpNeeded += level * 50;
  }
  
  return level - 1; // Subtract 1 because we incremented one extra time
}

/**
 * Calculate XP needed for next level
 * @param {Number} currentLevel - User's current level
 * @returns {Number} XP needed to reach next level
 */
export function getXPForNextLevel(currentLevel) {
  return (currentLevel + 1) * 50;
}

/**
 * Calculate total XP needed to reach a specific level
 * @param {Number} targetLevel - The level to calculate for
 * @returns {Number} Total XP needed
 */
export function getTotalXPForLevel(targetLevel) {
  let totalXP = 0;
  for (let level = 1; level < targetLevel; level++) {
    totalXP += (level + 1) * 50;
  }
  return totalXP;
}