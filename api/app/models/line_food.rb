class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :restaurant
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }

  # LineFood.activeと記述するとActiveRecord_Relationの形で返す
  scope :active, -> { where(active: true) }
  # LineFood.other_restaurant(2)
  scope :other_restaurant, ->(picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  def total_amount
    food.price * count
  end
end
