<?php
//namespace stackoverflow;
//use BD\WorkWithDB;
//проверяет есть ли в базе такая запись, если есть достает ей и ложит в поле text, если нету то в поле текст ложиться null
include_once '../BD/WorkWithDB.stackoverflow.class.php';

class CacheGetter1 {
    function formationMapWithText($idArray) {
        foreach ($idArray as $val) {
            $arrayOfId[] = $val['id_vacancies'];
        }
        foreach ($idArray as $id) {
//            echo $id;
            $vacancyMap[$id['id_vacancies']] = array('id_vacancies' => $id,
                'text' => null);
        }
        $db = WorkWithDB1::getInstance();
        $dbAnswer = $db->giveData($arrayOfId);
//        var_dump($dbAnswer);
        foreach ($dbAnswer as $key => $textAndId) {
            $dbAnswerMap[$textAndId['id_vacancies']] = array('id_vacancies' => $textAndId['id_vacancies'],
                'text' => $textAndId['text_vacancies']);
        }
        foreach ($vacancyMap as $vacancyId => $vacancyIdAndCompany) {
            if (null != $dbAnswerMap[$vacancyId]) {
                $vacancyIdAndTextMap[$vacancyId] = array('id_vacancies' => $vacancyId,
                    'text' => $dbAnswerMap[$vacancyId]['text']);
            } else {
                $vacancyIdAndTextMap[$vacancyId] = array('id_vacancies' => $vacancyId,
                    'text' => null);
            }
        }
//var_dump($vacancyIdAndCompanyAndTextMap);
        return $vacancyIdAndTextMap;
    }

}
//$c = new CacheGetter();
//$x = $c->formationMapWithText(array(array('company'=>'templatemonster','id_vacancies'=>17657)));
//echo'<pre>';
//print_r($x);
