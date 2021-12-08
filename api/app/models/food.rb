class Food < ApplicationRecord
  belongs_to :restaurant
  # nilを許可(外部キーがnilでもDBに保存できる)
  belongs_to :order, optional: true
  has_one :line_food
end
