<?php

function getRss(string $url): string
{
    $rss = simplexml_load_file($url);

    $response = [];
    $basePath = 'images/';

    foreach ($rss->channel->item as $item) {
        if (isset($item->title) && isset($item->enclosure) && isset($item->enclosure['url'])) {
            $imageUrl = (string)$item->enclosure['url'];
            $title = (string)$item->title;

            $filePathInfo = pathinfo($imageUrl);
            $encryptedName = md5($filePathInfo['filename']);
            $filePath = $basePath . $encryptedName . '.' . $filePathInfo['extension'];

            if (!file_exists($filePath)) {
                $saveResult = file_put_contents($filePath, file_get_contents($imageUrl));

                if ($saveResult) {
                    $response[] = prepareResponseData($title, $filePath);
                }
            } else {
                $response[] = prepareResponseData($title, $filePath);
            }
        }
    }

    return json_encode($response);
}

function prepareResponseData(string $title, string $path): array
{
    return [
        'title' => $title,
        'image' => $path,
    ];
}

getRss('https://www.nu.nl/rss/Sport');
