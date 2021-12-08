class Restaurant < ApplicationRecord
  has_many :foods
  has_many :line_foods, through: :foods

  validates :name, :fee, :time_required, presence: true
  validates :name, length: { maximum: 30 }
  # 0より大きい正の数(マイナスは禁止)
  validates :fee, numericality: { greater_than: 0 }
end
