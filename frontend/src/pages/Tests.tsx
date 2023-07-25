import TestItem from "../components/test-item/TestItem";


function Tests() {


   return (
      <div className="tests-page">
         <div className="tests-page__container container">
            <div className="tests-page__list">
               <div className="tests-page__item">
                  <TestItem />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Tests;
