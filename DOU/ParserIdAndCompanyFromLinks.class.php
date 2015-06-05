<?php

//возвращяет массив вида array(1=>array('company'=>,'id_vacancies'));
class ParserIdAndCompanyFromLinks {

    function processingReferences($linksToJobsArray) {
        if (!empty($linksToJobsArray)) {
            $linksToJobsLength = sizeof($linksToJobsArray);
            for ($i = 0; $i < $linksToJobsLength; $i++) {
                preg_match("/vacancies\/\d+/", $linksToJobsArray[$i], $arrayOfVacancies);
                preg_match("/\d+/", $arrayOfVacancies[0], $arrayOfVacanciesId);
                $idOfVacancies = $arrayOfVacanciesId[0];
                $beginningCompaniesPosition = stripos($linksToJobsArray[$i], 'companies/');
                $lengthURL = strlen($linksToJobsArray[$i]);
                $newLine = substr($linksToJobsArray[$i], $beginningCompaniesPosition + 10, $lengthURL);
                $searcPosition = stripos($newLine, '/vacancies');
                $lengthNewLine = strlen($newLine);
                $companyName = substr($newLine, -$lengthNewLine, $searcPosition);
                $data[] = array(
                    'company' => "$companyName",
                    'id_vacancies' => "$idOfVacancies"
                );
            }
        }
        return $data;
    }

}
//$c = new ParserIdAndCompanyFromLinks();
//$x = $c->processingReferences(array('http://jobs.dou.ua/companies/templatemonster/vacancies/17657/'));
//echo '<pre>';
//print_r($x);