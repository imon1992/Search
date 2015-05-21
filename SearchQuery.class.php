<?php

//получаем строку запроса и юрл запроса с ajaxa
//получаем массив с данными о вакансиях и делаем поиск по этим данным
include_once 'simpl/simple_html_dom.php';
include_once 'ProcessingDataArrayWithText.class.php';
include_once 'MainVacantionPageParser.class.php';
include_once 'CacheGetter.class.php';
include_once 'ParserIdAndCompanyFromLinks.class.php';

class searchQuery
{

    function search($url, $searchObject)
    {
//        $searchObject = json_decode($searchObject);
        $mainVacantionPageParser = new MainVacantionPageParser();
        $linksToJobsArray = $mainVacantionPageParser->parceNextPart($url);

        $parserIdAndCompanyFromLinks = new ParserIdAndCompanyFromLinks();
        $idAndCompanyArray = $parserIdAndCompanyFromLinks->processingReferences($linksToJobsArray);

        $cacheGetter = new CacheGetter();
        $idAndCompaniesAndMayNotBeCompleteTextArray = $cacheGetter->formationMapWithText($idAndCompanyArray);

        $processingDataArrayWhithText = new ProcessingDataArrayWhithText();
        $fullMapArray = $processingDataArrayWhithText->takeTheMissingText($idAndCompaniesAndMayNotBeCompleteTextArray);


        $searchResultMap = $this->findKeyWords($fullMapArray, $searchObject);
        return $searchResultMap;
    }

    function findKeyWords($fullMapArray, $searchObject)
    {
        foreach ($fullMapArray as $idAndCompanyAndText) {
            foreach ($searchObject as $searchStringObject) {
                $isAllKeysPresented = $this->isKeyPresent($searchStringObject->search, $idAndCompanyAndText['text']);
                if ($searchStringObject->notPresented !== null) {
                    $isPresentedKeyPresent = $this->isKeyPresent(
                        $searchStringObject->notPresented,
                        $idAndCompanyAndText['text']);
                }
                if ($isAllKeysPresented && !$isPresentedKeyPresent) {
                    $searchResultMap = $this->insertKeyWord($searchResultMap, $searchStringObject->name);
                }
            }
        }
        return $this->putZeroIfKeyNotPresent($searchResultMap, $searchObject);
    }

    function isKeyPresent($keyArrays, $idAndCompanyAndText)
    {
        $idAndCompanyAndText = str_replace('href="javascript:;', '', $idAndCompanyAndText);
        $idAndCompanyAndText = str_replace('type="text/javascript', '', $idAndCompanyAndText);
        foreach ($keyArrays[0] as $key => $data) {
            if (strpos(strtolower($idAndCompanyAndText), strtolower($keyArrays[0]->$key)) !== false) {
                return true;
            }
        }
        return false;
    }

    function insertKeyWord($searchResultMap, $searchString)
    {
        if (null != $searchResultMap[$searchString]) {
            $searchResultMap[$searchString]++;
        } else {
            $searchResultMap[$searchString] = 1;
        }
        return $searchResultMap;
    }

    function putZeroIfKeyNotPresent($searchResultMap, $searchObject)
    {
        foreach ($searchObject as $key => $searchStringObject) {
            if (null == $searchResultMap[$searchStringObject->name]) {
                $searchResultMap[$searchStringObject->name] = 0;
            }
        }
        return $searchResultMap;

    }

}

