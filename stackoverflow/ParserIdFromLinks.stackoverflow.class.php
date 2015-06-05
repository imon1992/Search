<?php
//namespace stackoverflow;

class ParseId{
    public function processingReferences($linksToJobsArray){
        if (!empty($linksToJobsArray)) {
            $linksToJobsLength = sizeof($linksToJobsArray);
            for ($i = 0; $i < $linksToJobsLength; $i++) {
                preg_match("/\/\d+\//", $linksToJobsArray[$i], $arrayOfVacancies);
                preg_match("/\d+/", $arrayOfVacancies[0], $arrayOfVacanciesId);
                $idOfVacancies = $arrayOfVacanciesId[0];
                $data[] = array(
                    'id_vacancies' => "$idOfVacancies"
                );
            }
        }
        return $data;
    }
}