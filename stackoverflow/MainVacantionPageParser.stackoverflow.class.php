<?php
//namespace stackoverflow;
include_once '../simpl/simple_html_dom.php';

class MainVacationPageParser
{
    function linksParse($url, $programmingLanguage)
    {
        if ($curl = curl_init()) {
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, "count=0&csrfmiddlewaretoken=sTZxFTpI7xU7TtxB4lVfNUTQcT55BFPm");
            curl_setopt($curl, CURLOPT_COOKIE, "__gads=ID=16e61c63986cc981:T=1412706042:S=ALNI_MaOyUGB7e9rZQHHjEP_YdImdbAfyA; __utmt=1; csrftoken=sTZxFTpI7xU7TtxB4lVfNUTQcT55BFPm; __utma=15214883.1329840483.1412706043.1425585907.1425592692.26; __utmb=15214883.18.10.1425592692; __utmc=15214883; __utmz=15214883.1425376018.14.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided);");
            $out = curl_exec($curl);
            curl_close($curl);
        }
        $html = new simple_html_dom();
        $html->load($out);
        $fullLinksToJobs = array('linksToJob'=>array(),'endOfCycle'=>'true');
        foreach ($html->find('div[class=listResults -jobs list jobs]') as $element) {
//            echo 'adsad';
            foreach ($element->find('div.listResults div.tags') as $tagsName) {
                if (strpos(strtolower($tagsName), strtolower('php')) !== false) {
                    $partLinksToJob[] = $tagsName->parentNode()->childNodes(2)->childNodes(0)->href;
//                    echo $tagsName->parentNode()->childNodes(2)->childNodes(0)->href;
//                    echo '<br>';
                }else{
                    $fullLinksToJobs['endOfCycle']=false;
                    break 2;
//                    return false;
                }
            }
        }
//var_dump($partLinksToJob);
//        return $linksToJob;
        if($partLinksToJob != null && is_array($partLinksToJob)){
            foreach ($partLinksToJob as $linksPart) {
                $fullLinksToJobs['linksToJob'][] = 'http://careers.stackoverflow.com/' . $linksPart;
            }
        }
//        print_r($fullLinksToJobs);
        return $fullLinksToJobs;
    }
//     function linksParse($url, $programmingLanguage)
//    {
//        $html = file_get_html($url);
////        foreach ($html->find('div.listResults div.tags p ') as $element) {
//////            preg_match("/\d+/", $element->innertext, $countOfVacancy);
//////            echo $element;
//////            var_dump($element);
////            if (strpos(strtolower($element), strtolower('php')) !== false) {
////            echo 'nashli';
////
////            }else{ }
////
////        }
////var_dump($html->find('div.listResults'));
//        foreach ($html->find('div[class=listResults -jobs list jobs] div.listResults') as $element) {
////            echo $element;
////            var_dump($element);
//            foreach($element->find('div div.tags') as $block){
//            echo 'find ';
//
//            }
////            foreach ($element->find('div.listResults div.tags') as $tagsName) {
////                if (strpos(strtolower($tagsName), strtolower('php')) !== false) {
//////                    echo 'find ';
//////                    echo '<pre>';
//////                    print_r($element->find('div.listResults h3.-title a href')->href);
////                    foreach($element->find('div.listResults h3.-title a') as $href)
////                        echo $href->href . '<br>';
////                }
////            }
////        }        foreach ($html->find('div[class=listResults -jobs list jobs]') as $element) {
//////            echo $element;
//////            var_dump($element);
////            foreach ($element->find('div.listResults div.tags') as $tagsName) {
////                if (strpos(strtolower($tagsName), strtolower('php')) !== false) {
//////                    echo 'find ';
//////                    echo '<pre>';
//////                    print_r($element->find('div.listResults h3.-title a href')->href);
////                    foreach($element->find('div.listResults h3.-title a') as $href)
////                        echo $href->href . '<br>';
////                }
////            }
//        }
////        foreach ($partOfTheLinksToJobs[0] as $linksPart) {
////            $fullLinksToJobs[] = 'http://careers.stackoverflow.com/' . $linksPart . "&searchTerm=$programmingLanguage";
////        }
////        return $fullLinksToJobs;
//    }
//    }    protected function linksParse($url, $programmingLanguage)
//    {
//        if ($curl = curl_init()) {
//            curl_setopt($curl, CURLOPT_URL, $url);
//            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//            curl_setopt($curl, CURLOPT_POST, true);
//            curl_setopt($curl, CURLOPT_POSTFIELDS, "count=0&csrfmiddlewaretoken=sTZxFTpI7xU7TtxB4lVfNUTQcT55BFPm");
//            curl_setopt($curl, CURLOPT_COOKIE, "__gads=ID=16e61c63986cc981:T=1412706042:S=ALNI_MaOyUGB7e9rZQHHjEP_YdImdbAfyA; __utmt=1; csrftoken=sTZxFTpI7xU7TtxB4lVfNUTQcT55BFPm; __utma=15214883.1329840483.1412706043.1425585907.1425592692.26; __utmb=15214883.18.10.1425592692; __utmc=15214883; __utmz=15214883.1425376018.14.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided);");
//            $out = curl_exec($curl);
//            curl_close($curl);
//            preg_match_all("/\/jobs\/\d+\/([\w-%]+)(\?a=\w+)/", $out, $partOfTheLinksToJobs);
//        }
//        foreach ($partOfTheLinksToJobs[0] as $linksPart) {
//            $fullLinksToJobs[] = 'http://careers.stackoverflow.com/' . $linksPart . "&searchTerm=$programmingLanguage";
//        }
//        return $fullLinksToJobs;
//    }

    public function allLinks($url, $programmingLanguage)
    {
        echo date('Y h:i:s A');
        $html = file_get_html($url);
//        var_dump($html);
        foreach ($html->find('#index-hed h2 span') as $element) {
            preg_match("/\d+/", $element->innertext, $countOfVacancy);
        }
//        echo 'assa';
        $countOfVacancy = $countOfVacancy[0];
        $countOfPages = ceil($countOfVacancy / 25);
//        echo $countOfPages;
        for ($i = 1; $i <= $countOfPages; $i++) {
            if ($i == 1) {
                $urlWithPageNumber = $url;
            } else {
                $urlWithPageNumber = $urlWithPageNumber = $url . "&pg=$i";
            }
            $linksToJob = $this->linksParse($urlWithPageNumber, $programmingLanguage);
            if($linksToJob != null && is_array($linksToJob))
                $allLinksToJob = array_merge((array)$allLinksToJob, $linksToJob['linksToJob']);
            if($linksToJob['endOfCycle'] === false)
                break;
        }
        echo date('Y h:i:s A');
        return $allLinksToJob;

    }
}

$c = new MainVacationPageParser();
$a = $c->allLinks('http://careers.stackoverflow.com/jobs/tag/symfony2', 'symfony2');
//echo '<pre>';
//print_r($a);
//$a = $c->linksParse('http://careers.stackoverflow.com/jobs?searchTerm=php&pg=2', 'php');
//echo '<pre>';
//print_r($a);

include_once "ParserIdFromLinks.stackoverflow.class.php";
$d = new ParseId();
$s = $d->processingReferences($a);

//echo '<pre>';
//print_r($s);
//
include_once "CacheGetter.stackoverflow.class.php";
$h = new CacheGetter1();
$t = $h->formationMapWithText($s);
//
//echo '<pre>';
//print_r($t);

include_once 'ProcessingDataArrayWithText.stackoverflow.class.php';

$y = new ProcessingDataArrayWithText();
$k = $y->takeTheMissingText($t);


//echo '<pre>';
//print_r($k);