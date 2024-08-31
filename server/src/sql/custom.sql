-- Custom Functions/Views can go here

DROP VIEW IF EXISTS device_update_progress;
CREATE VIEW device_update_progress AS
SELECT device_update_progress.device_id,
       device_update_progress.last_updated,
       CASE
           -- 1: Update in progress
           WHEN device_update_progress.update_in_progress = true THEN 1
           -- 0: Up to date
           WHEN device_update_progress.has_latest_version THEN 0
           -- 2: Unknown
           ELSE 2 END AS update_status
FROM (SELECT devices.id                                               AS device_id,
             MAX(updates.finished)                                    AS last_updated,
             (devices.firmware_version_id = (SELECT MAX(id)
                                             FROM firmware_versions)) AS has_latest_version,
             MIN(IFNULL(updates.finished, 0)) = 0                     AS update_in_progress
      FROM devices
               LEFT JOIN updates ON devices.id = updates.device_id
      GROUP BY devices.id) AS device_update_progress;

