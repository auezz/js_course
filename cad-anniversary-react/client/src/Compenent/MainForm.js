import './MainForm.css';
import SelectCardSection from './SelectCardSection';
import InputSection from './InputSection';
export default function MainForm({wishList, govList, departmentList, onGovChange, prefixList, govId, cardList}) {
  //console.log('mainForm', category);
  return (
          <div className='main-form d-flex gap-5 bd-highlight'>
              <SelectCardSection
                cardList={cardList}
              />
              <InputSection 
                wishList={wishList} 
                govList={govList} 
                departmentList={departmentList} 
                onGovChange={onGovChange}
                prefixList={prefixList}
                govId={govId}
              />
          </div>
        )
}

