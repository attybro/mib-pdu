Add monitoring MIB-PDU (Nagios->ngsi_adapter->ContextBroker)
_____________________________________________________________


Adapter and actions to perform in order to monitoring power-usage from Nagios probes (ny snmp) to NGSI context
attributes, and forward them through a NGSI Context Broker.

Introduction
============

The repository is composed by two files:
- `check_power` (a bash script)
- `check_power.js` (the ngsi_adapter ad-hoc script)

Installation
============

- Downolad the repository
- Copy the check_power bash script under the proper nagios path (i.e. `/usr/local/nagios/libexec`)
- Copy the ngsi_adapter parser (`check_power.js`) into the proper `lib/parsers` folder
- Add a command in the nagios configuration file
```
define command{
  command_name check_power
  command_line /usr/local/nagios/libexec/check_power -a $ARG1$ -b $ARG2$ -x $ARG3$ -y $ARG4$ -c 0 -w 0
}
```
- Add a probe for every host_controller or host_compute. Please pay attention to force the last row **_entity_type** with the porper field
```
define service {
  use                 generic-service
  host_name           node-1
  service_description aggregatePower
  check_command check_power!IP1!OID1!IP2!OID2
  _entity_type host_compute
}
```
The command **check_command check_power!IP1!OID1!IP2!OID2** aggregates the two measures, but you can collect also a single measure by using  **check_command check_power!IP1!OID1**.
Remember to change the IP\* with the IP addrress *(i.e. 10.0.0.1)* of the monitored entity and the OID\* *(i.e. 1.3.6.1.4.1.534.6.6.7.6.5.1.3.0.3)* with the ID of the snmp object that you are monitoring

