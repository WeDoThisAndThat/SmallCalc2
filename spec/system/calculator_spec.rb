require 'rails_helper'

RSpec.describe 'Calculator', type: :system, js: true do
  before do
    driven_by(:selenium_chrome_headless)
  end

  it 'displays the calculator page' do
    visit calculator_path
    expect(page).to have_content('Simple Calculator')
  end

  it 'performs addition correctly' do
    visit calculator_path
    
    fill_in 'num1', with: '5'
    fill_in 'num2', with: '3'
    click_button 'Add'
    
    expect(page).to have_content('8')
  end

  it 'handles decimal numbers' do
    visit calculator_path
    
    fill_in 'num1', with: '5.5'
    fill_in 'num2', with: '2.3'
    click_button 'Add'
    
    expect(page).to have_content('7.8')
  end

  it 'clears inputs and result' do
    visit calculator_path
    
    # First, perform a calculation
    fill_in 'num1', with: '10'
    fill_in 'num2', with: '5'
    click_button 'Add'
    
    expect(page).to have_content('15')
    
    # Then clear
    click_button 'Clear'
    
    expect(find('#num1').value).to eq('')
    expect(find('#num2').value).to eq('')
    expect(page).to have_content('Result: 0')
  end

  it 'allows new calculation after clearing' do
    visit calculator_path
    
    # First calculation
    fill_in 'num1', with: '10'
    fill_in 'num2', with: '5'
    click_button 'Add'
    expect(page).to have_content('15')
    
    # Clear
    click_button 'Clear'
    
    # New calculation
    fill_in 'num1', with: '7'
    fill_in 'num2', with: '3'
    click_button 'Add'
    expect(page).to have_content('10')
  end
end
